import { DataSource } from 'typeorm';
import { Member } from '../../../domain/entities/member.entity';

export const seedMembers = async (dataSource: DataSource) => {
  const memberRepository = dataSource.getRepository(Member);

  const members = [
    {
      code: 'M001',
      name: 'Angga',
    },
    {
      code: 'M002',
      name: 'Ferry',
    },
    {
      code: 'M003',
      name: 'Putri',
    },
  ];

  for (const memberData of members) {
    const member = memberRepository.create(memberData);
    await memberRepository.save(member);
  }

  console.log('Members seeded successfully');
};
